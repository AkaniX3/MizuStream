import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./features/userSlice"
import { authModalSlice } from "./features/authModalSlice";
import { globalLoadingSlice } from "./features/globalLoadingSlice";
import { appStateSlice } from "./features/appStateSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        authModal: authModalSlice,
        globalLoading: globalLoadingSlice,
        appState: appStateSlice
    }
})

export default store;