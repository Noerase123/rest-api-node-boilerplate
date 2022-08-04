const {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification
} = require('firebase/auth')

module.exports = (init) => ({
    sendToEmail: async () => {
        const response = await sendEmailVerification(auth.currentUser)
        return response 
    },
    signInUser: ({ email, password }) => {
        init()
        const auth = getAuth()
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then(response => resolve(response))
                .then(error => reject(error))
        })
    },
    createUser: ({ email, password }) => {
        init()
        const auth = getAuth()
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    signInGoogle: () => {
        init()
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    signInFacebook: () => {
        init()
        const auth = getAuth()
        const provider = new FacebookAuthProvider()
        return new Promise((resolve, reject) => {
            signInWithPopup(auth, provider)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    isAuthActive: () => {
        init()
        const auth = getAuth()
        return new Promise((resolve) => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    resolve(user)
                }
            })
        })
    },
    signOutAuth: () => {
        init()
        const auth = getAuth();
        return new Promise((resolve, reject) => {
            signOut(auth)
            .then(() => resolve(true))
            .catch(error => reject(error))
        })
    }
})