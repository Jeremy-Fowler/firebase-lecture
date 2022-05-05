export const dev = window.location.origin.includes('localhost')
export const baseURL = dev ? 'http://localhost:3000' : ''
export const useSockets = false
export const domain = 'jeremy-is-cool.us.auth0.com'
export const clientId = 'i8i46RsQKfs43bbUpohFpr1bw7M5xYak'
export const audience = 'https://student-auth.com'

export const firebaseConfig = {
  apiKey: "AIzaSyCiWgSUqQgkCvnEKfYJxNe9QdqufGwjhz0",
  authDomain: "friendlychat-d753a.firebaseapp.com",
  projectId: "friendlychat-d753a",
  storageBucket: "friendlychat-d753a.appspot.com",
  messagingSenderId: "756235585625",
  appId: "1:756235585625:web:d9f57828bccde12df60948"
};

