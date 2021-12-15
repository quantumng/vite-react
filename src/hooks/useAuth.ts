import {RootState} from '@store';
import { useSelector } from "react-redux"
export const useAuthor = () => {
    const isLogin = useSelector((state:RootState) => state.user.isLogin);

    return {
        isLogin,
    }
}