import path from 'path'

export const AVATAR_PATH = path.resolve(__dirname, '..', '..', 'public', 'uploads', 'avatar')
export const getAvatarUri = (avatarName: string) => '/static/uploads/avatar/'.concat(avatarName)
export const WEB_TOKEN_HEADER_KEY = 'bearer-token'
export const WEB_USER_ID_HEADER_KEY = 'user-mid'
