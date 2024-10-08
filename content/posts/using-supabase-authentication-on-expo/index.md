+++
title = "Using Supabase Authentication on Expo"
date = "2021-12-24"
author = "An7"
authorTwitter = ""
tags = []
keywords = []
description = "How to integrate Supabase Authentication into Expo, with GitHub OAuth example."
showFullContent = false
readingTime = true
hideComments = false
+++

I will start in the order of the steps you would want to do with a new Expo
project. Although you could figure out Supabase Authentication via this blog, I
highly recommend following Supabase documentation first, starting with the
non-native version.

Checkout the initialization of a brand new Expo project since `expo init`
[here][1].

# Supabase initialization

```typescript
// src/lib/supabase.ts
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

export const supabaseConfig = Constants.manifest?.extra?.supabase;

const supabase = createClient(supabaseConfig.url, supabaseConfig.publicKey, {
  localStorage: AsyncStorageLib,
});

export default supabase;
```

Notice how I'm using the `localStorage` option.

I use `app.json` to configure Supabase, simply because I haven't found any
reason to use something like environment variables for a mobile app.
[Learn more about configuring Expo app with app.json.][2]

One thing I should note,
[you need to set a `scheme` in your `app.json` in order for the Expo redirection proxy to work][3].

# Auth Context

Since it's a client-side app (of course it is), I would store the Auth Session
in a React Context because it **absolutely** does NOT need Redux. It is heavily
inspired from Kent C. Dodds' ["How to use React Context effectively"][4].

The code below is **long** and contains documentation & explainations. You can
find various stripped-out version of this context on the internet, but I've gone
through and solve some of these following problems:

- Supabase uses `setTimeout` for refreshing the Access Token. In the context of
  Native apps, the app might be backgrounded, so it warns you about that. We can
  safely ignore this, check the explanation in the code.
- If the app _cold starts_, even if the user has signed in before, the
  `AsyncStorage` on the Native would not response _synchronously_, hence causing
  the login screen to flash for a second. Solution, documentation and
  explanation is in the code.
- `useAuthUser` fetches the user from the session. It is, my by intention,
  included in the same file. Doesn't make sense to put that anywhere else.

```typescript
// src/state/auth-context.tsx
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { AuthSession } from "@supabase/supabase-js";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LogBox } from "react-native";
import { isBrowser } from "../lib/helpers";
import supabase from "../lib/supabase";

type State = {
  session: AuthSession | null | undefined;
};

export const AuthContext = createContext<State | undefined>(undefined);

function AuthContextProvider({ children }: { children: ReactNode }) {
  /**
   * What the session state can tell us:
   * - undefined: The session is being loaded.
   * - null: The session is fetched and is unavailable.
   * - AuthSession: There is a session.
   */
  const [session, setSession] = useState<AuthSession | null | undefined>(
    undefined,
  );

  useEffect(() => {
    /**
     * About the "Setting a timer for a long period of time..." warning:
     *
     * Take a look at this GitHub response: https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
     * It says:
     *
     * > If you don't mind having your timer get activated later when the app is
     * > foregrounded again, then I think ignoring the YellowBox warning is a good idea.
     *
     * The timer is for the token refresh task, from GoTrueClient.js. When the access token is expired,
     *  the access token needs to be refreshed. For a 1 hour JWT expiration duration on Supabase,
     *  it is scheduled when 59 minutes has passed. If it could not run at that specific time
     *  because the app were not foregrounded, then the access token would be refreshed as
     *  soon as the app is opened up. If it succeeded, the authentication is conserved. Otherwise,
     *  the session would be expired, requiring the user for a re-login.
     *
     * Therefore, we can safely ignore this warning. Even in the case of the user making requests
     *  while the token is being refreshed, they should fail as they are using the expired token.
     *  The failed requests should be handled accordingly instead of bringing the app to a halt.
     *  The refresh should be fast enough.
     */
    LogBox.ignoreLogs(["Setting a timer"]);

    const fetchedSession = supabase.auth.session();
    /**
     * Fixing the "login screen flashing on app open" problem:
     *
     * The session could be immediately fetched on the web. But we might be using Native here.
     *
     * So if it's Native, we would keep the session as undefined if it's not already been fetched before.
     *  We would then go visit the AsyncStorage, if it doesn't have a session, the session would be null.
     *  If it has, keep the current session state because the onAuthStateChange would setSession for us later.
     *  It might even have done that before our check.
     */
    setSession(fetchedSession || isBrowser() ? fetchedSession : undefined);
    (async () => {
      if (isBrowser()) return;
      const storageSession = await AsyncStorageLib.getItem(
        "supabase.auth.token",
      );
      if (!storageSession) {
        setSession((oldSession) =>
          oldSession === undefined ? null : oldSession,
        );
      }
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        setSession(newSession);
      },
    );

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
    }),
    [session],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      `useAuthContext must be used within a AuthContextProvider.`,
    );
  }
  return context;
};

const useAuthUser = () => {
  const { session } = useAuthContext();
  if (session === undefined) return undefined;
  return session?.user ?? null;
};

export { AuthContextProvider, useAuthContext, useAuthUser };
```

The helper file:

```typescript
// src/lib/helpers.ts
import { Platform } from "react-native";

// eslint-disable-next-line import/prefer-default-export
export const isBrowser = () => Platform.OS === "web";
```

# Login Screen

Again, you could find various versions of this. They could not figure out how to
work with the redirect proxy that Expo provides, so I do it myself.

```typescript
// src/screens/auth/Login.tsx
import * as AuthSession from "expo-auth-session";
import { Pressable, StyleSheet, Text, View } from "react-native";
import supabase, { supabaseConfig } from "../../lib/supabase";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default function Login() {
  const handleGithubLogin = async () => {
    /**
     * Read this: https://docs.expo.dev/versions/latest/sdk/auth-session/#what--authexpoio--does-for-you
     * In the `authUrl` we don't want Supabase to know our varied URL. The auth.expo.io flow tries to hide
     *  the varied URL from Supabase. So, auth.expo.io is the one who will know our varied URL, and Supabase
     *  will only know https://auth.expo.io/@username/app-slug.
     */

    const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true }); // https://auth.expo.io
    const redirectUri = AuthSession.makeRedirectUri({ useProxy: false }); // Some URL which we don't know beforehand
    const provider = "github";

    const response = await AuthSession.startAsync({
      authUrl: `${supabaseConfig.url}/auth/v1/authorize?provider=${provider}&redirect_to=${proxyRedirectUri}`,
      returnUrl: redirectUri,
    });

    if (response.type !== "success") return;

    await supabase.auth.signIn({
      refreshToken: response.params.refresh_token,
    });
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Pressable onPress={handleGithubLogin}>
        <Text>Login with GitHub</Text>
      </Pressable>
    </View>
  );
}
```

# Navigation

The principle is aligned with the examples on the React Navigation
documentation. Notice which screens are rendered with each possible value of
`user`. Another thing is the `Promise.allSettled()` polyfill that Supabase
requires, see the code for the documentation.

```typescript
// App.tsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import allSettled from "promise.allsettled";
import LogoutButton from "./src/components/LogoutButton";
import { RootStackParamList } from "./src/navigation/types";
import Login from "./src/screens/auth/Login";
import Home from "./src/screens/Home";
import Loading from "./src/screens/auth/Loading";
import { AuthContextProvider, useAuthUser } from "./src/state/auth-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const user = useAuthUser();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === undefined && (
          <Stack.Screen name="Loading" component={Loading} />
        )}
        {user === null && <Stack.Screen name="Login" component={Login} />}
        {user && (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerRight: LogoutButton }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  /**
   * Polyfill for Promise.allSettled, used by Supabase. Remove when
   *  this PR has been merged: https://github.com/then/promise/pull/171
   * Supabase usage: https://github.com/supabase/supabase-js/commit/6cf54a2972472e259a775bd950c88dff4cd91a1f
   */
  allSettled.shim();

  return (
    <AuthContextProvider>
      <AppNavigator />
    </AuthContextProvider>
  );
}
```

# Resources

Check out the code snapshot [here][1].

[1]: https://github.com/intagaming/expo-todo/tree/f0ec63c75cc1769f63db7f4ee8094d74039b00c6
[2]: https://docs.expo.dev/workflow/configuration/
[3]: https://docs.expo.dev/versions/latest/sdk/auth-session/#it-makes-redirect-url-allowlists-easier-to
[4]: https://kentcdodds.com/blog/how-to-use-react-context-effectively
