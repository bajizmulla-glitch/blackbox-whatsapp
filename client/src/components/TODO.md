# Authentication Enforcement TODO

## Plan Steps:
1. ✅ Create `client/src/components/AuthWrapper.jsx` - View toggle between Login/Signup
2. ✅ Update `client/src/App.jsx` - Strict auth check, render AuthWrapper if not authenticated, no main UI leak
3. ✅ Update `client/src/components/Login.jsx` - Add `onSwitchToSignup` prop, fix link handler to "Sign Up" button
4. ✅ Update `client/src/components/Signup.jsx` - Add `onSwitchToLogin` prop, fix link handler
5. ⬜ Test: Clear localStorage, verify only auth; toggle Signup/Login; login → app; no UI bypass

**All code changes complete. Ready for testing.**

To test:
1. Run `cd client && npm run dev`
2. Open browser, clear localStorage: `localStorage.clear()` in console
3. Verify: Login shows first, "Sign Up" switches to Signup, login/signup saves to localStorage & shows full app (Sidebar/Chats), logout clears & returns to Login.
4. No main app UI renders before auth.
