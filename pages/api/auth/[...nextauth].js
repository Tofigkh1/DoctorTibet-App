// import NextAuth from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'
// import { FirebaseAdapter } from '@next-auth/firebase-adapter'
// import { getFirestore } from 'firebase/firestore'
// import { initializeApp } from 'firebase/app'

// const firebaseConfig = {
//   apiKey: "AIzaSyAGh9AFmjbVUl-M0uoqr2cqnVcV5T1k5vM",
//   authDomain: "tiensapp-92bab.firebaseapp.com",
//   projectId: "tiensapp-92bab",
//   storageBucket: "tiensapp-92bab.appspot.com",
//   messagingSenderId: "736874346462",
//   appId: "1:736874346462:web:88c07df6a0e9978e790f4f"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// const db = getFirestore(app)

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//   ],
//   adapter: FirebaseAdapter(db), // Directly pass db instead of an object
// })
