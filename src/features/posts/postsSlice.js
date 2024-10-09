import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
// import { db, storage } from "../../firebase";
// import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const BASE_URL = "https://8ab5a041-0ba3-4f7b-8a44-36be1bedff84-00-3ttw70bhq1idl.sisko.replit.dev"

export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
            });
    },
});

export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;
        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        }

        const response = await axios.post(`${BASE_URL}/posts`, data);
        return response.data;
    }
);

// export const fetchPostsByUser = createAsyncThunk(
//     "posts/fetchByUser",
//     async (userId) => {
//         try {
//             const postsRef = collection(db, `users/${userId}/posts`);
//             const querySnapshot = await getDocs(postsRef);
//             const docs = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));

//             return docs;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// );

// export const savePost = createAsyncThunk(
//     "posts/savePost",
//     async ({ userId, postContent, file }) => {
//         try {
//             const imageRef = ref(storage, `posts/${file.name}`);
//             const response = await uploadBytes(imageRef, file);
//             const imageUrl = await getDownloadURL(response.ref);
//             const postsRef = collection(db, `users/${userId}/posts`);
//             const newPostRef = doc(postsRef);
//             await setDoc(newPostRef, { content: postContent, likes: [], imageUrl });
//             const newPost = await getDoc(newPostRef);

//             const post = {
//                 id: newPost.id,
//                 ...newPost.data(),
//             };

//             return post;
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// );

// export const likePost = createAsyncThunk(
//     "posts/likePost",
//     async ({ userId, postId }) => {
//         try {
//             const postRef = doc(db, `users/${userId}/posts/${postId}`);

//             const docSnap = await getDoc(postRef);

//             if (docSnap.exists()) {
//                 const postData = docSnap.data();
//                 const likes = [...postData.likes, userId];

//                 await setDoc(postRef, { ...postData, likes });
//             }

//             return { userId, postId };
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// );

// export const removeLikeFromPost = createAsyncThunk(
//     "posts/removeLikeFromPost",
//     async ({ userId, postId }) => {
//         try {
//             const postRef = doc(db, `users/${userId}/posts/${postId}`);

//             const docSnap = await getDoc(postRef);

//             if (docSnap.exists()) {
//                 const postData = docSnap.data();
//                 const likes = postData.likes.filter((id) => id !== userId);

//                 await setDoc(postRef, { ...postData, likes });
//             }

//             return { userId, postId };
//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }
// );

// const postsSlice = createSlice({
//     name: "posts",
//     initialState: { posts: [], loading: true },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchPostsByUser.fulfilled, (state, action) => {
//                 state.posts = action.payload;
//                 state.loading = false;
//             })
//             .addCase(savePost.fulfilled, (state, action) => {
//                 state.posts = [action.payload, ...state.posts];
//             })
//             .addCase(likePost.fulfilled, (state, action) => {
//                 const { userId, postId } = action.payload;

//                 const postIndex = state.posts.findIndex((post) => post.id === postId);

//                 if (postIndex !== -1) {
//                     state.posts[postIndex].likes.push(userId);
//                 }
//             })
//             .addCase(removeLikeFromPost.fulfilled, (state, action) => {
//                 const { userId, postId } = action.payload;

//                 const postIndex = state.posts.findIndex((post) => post.id === postId);

//                 if (postIndex !== -1) {
//                     state.posts[postIndex].likes = state.posts[postIndex].likes.filter(
//                         (id) => id !== userId
//                     );
//                 }
//             });
//     },
// });

export default postsSlice.reducer;
