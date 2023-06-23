const getErrorMessage = (errorCode) => {
    switch(errorCode){
        case 'auth/user-not-found':
            return 'User not found'
    }
}

export default getErrorMessage;