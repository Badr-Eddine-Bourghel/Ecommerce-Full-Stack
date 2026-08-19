import {store} from "@/store";
import { Provider } from "react-redux";

interface ReduxProviderProps {
    children: React.ReactNode;
}

function StateProvider({children}:ReduxProviderProps){
    return (
        <Provider store={store}>

        </Provider>
    );
}

export default StateProvider;