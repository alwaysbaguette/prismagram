const USER_FRAGMENT=`
    id
    userName
    email
`;
const COMMENT_FRAGMENT = `
    id
    text
    user{
        ${USER_FRAGMENT}
    }
`;

const FILE_FRAGMENT=`
    id
    url
`;

const FULL_POST_FRAGMENT = `
    fragment PostParts on Post{
        id
        caption
        location
        files{
            ${FILE_FRAGMENT}
        }
        comments{
            ${COMMENT_FRAGMENT}
        }
        user{
            ${USER_FRAGMENT}
        }
    }
`
export default {
    USER_FRAGMENT,
    COMMENT_FRAGMENT,
    FILE_FRAGMENT,
    FULL_POST_FRAGMENT
}

//주의 사항 순서가 있어야함
