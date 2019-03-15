const USER_FRAGMENT = `
    fragment UserParts on User{
        id 
        userName 
        email
        firstName
        lastName
        bio
        posts {
            id
            caption
        }
    }
`

export default {
    USER_FRAGMENT
}