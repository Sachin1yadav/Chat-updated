const initialState = {
    posts: [
        {
            id: 1,
            noOfLikes: 0,
            username: 'John',
            timestamp: '2 days ago',
            caption: 'Beautiful sunset at the beach!',
            imageSrc: 'https://images.unsplash.com/photo-1502085671122-2d218cd434e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1226&q=80',
            comments: [
                {
                    id: 100,
                    likes: 2,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "Amit",
                            timestamp: "2 hour ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "Sagar",
                            timestamp: "1 hour ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "Lakshya",
                            timestamp: "3 hour ago",
                        }
                    ]
                },
            ]
        },
        {
            id: 2,
            noOfLikes: 0,
            username: 'Jane',
            timestamp: '1 day ago',
            caption: 'Delicious meal at the restaurant!',
            imageSrc: 'https://images.unsplash.com/photo-1543039625-14cbd3802e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
            comments: [
                {
                    id: 100,
                    likes: 2,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                },
                {
                    id: 101,
                    likes: 5,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            noOfLikes: 0,
            username: 'Mark',
            timestamp: '3 hours ago',
            caption: 'Amazing view from the mountain!',
            imageSrc: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
            comments: [
                {
                    id: 100,
                    likes: 2,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                },
                {
                    id: 101,
                    likes: 5,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            noOfLikes: 0,
            username: 'Sarah',
            timestamp: '5 minutes ago',
            caption: 'Fun day at the park with friends!',
            imageSrc: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
            comments: [
                {
                    id: 100,
                    likes: 2,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                },
                {
                    id: 101,
                    likes: 5,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                }
            ]
        },
        {
            id: 5,
            noOfLikes: 0,
            username: 'Alex',
            timestamp: '1 hour ago',
            caption: 'Spectacular performance at the concert!',
            imageSrc: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
            comments: [
                {
                    id: 100,
                    likes: 2,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                },
                {
                    id: 101,
                    likes: 5,
                    description: 'wow nice one',
                    user: "John",
                    timestamp: "1 day ago",
                    Replies: [
                        {
                            id: 10,
                            description: "yes really",
                            likes: 0,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 11,
                            description: "Yes I know",
                            likes: 21,
                            user: "John",
                            timestamp: "1 day ago",
                        },
                        {
                            id: 12,
                            description: "really it is",
                            likes: 12,
                            user: "John",
                            timestamp: "1 day ago",
                        }
                    ]
                }
            ]
        },
    ],
    postHistory: {},
    postLikes: []
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POST_DATA':
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            };
        case 'SET_LIKES_DATA':
            const { id } = action.payload;
            const { operation } = action.payload;
            const newPosts = state.posts.map((post) => {
                if (post.id === id) {
                    return { ...post, noOfLikes: operation === 'inc' ? post.noOfLikes + 1 : post.noOfLikes - 1 };
                }
                return post;
            });
            return { ...state, posts: newPosts };
        case "GET_POST_HISTORY":
            return {...state, postHistory: action.payload.data}
        case "GET_POST_LIKE":
            return { ...state, postLikes: action.payload.data}
        default:
            return state;
    }
}

export default postReducer;


