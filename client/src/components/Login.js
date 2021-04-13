






//====================================sign in the user=========================================
const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => { alert(error.message)})
    //close the model
    setOpenSignIn(false)
    //empty the fields
    setEmail('')
    setPassword('')
    }
//====================================sign up the user=========================================
    const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    //createUserWithEmailAndPassword will create a user object 
    .then((authUser)=>{
        return authUser.user.updateProfile({
        //set displayname attribute of user object to usename
        displayName:username
        })
    })
    .catch((error)=>{alert(error.message)})
    setOpen(false)
}