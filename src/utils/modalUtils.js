import { deletePost } from '../redux/actions/posts';

export const deletePostCallback = (id) => {
    return async () => {
        await deletePost(id);
    }
}