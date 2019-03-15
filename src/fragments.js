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
const COMMENT_FRAGMENT = `
    fragment CommentParts on Comment{
        id
        text
        user{
            userName
        }
    }
`;

export default {
    USER_FRAGMENT,
    COMMENT_FRAGMENT
}