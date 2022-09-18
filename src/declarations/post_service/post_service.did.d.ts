import type { Principal } from '@dfinity/principal';
export type CreatePostResult = { 'Ok' : bigint } |
  { 'Err' : PostError };
export type GetInvitationCodeResult = { 'Ok' : string } |
  { 'Err' : PostError };
export type LinkInvitationResult = { 'Ok' : Post } |
  { 'Err' : PostError };
export interface Post {
  'id' : bigint,
  'is_invited' : boolean,
  'text' : string,
  'user_self_id' : string,
  'timestamp' : bigint,
  'user_other_id' : string,
}
export interface PostCreateCommand { 'text' : string, 'user_other_id' : string }
export type PostError = { 'PostAlreadyExists' : null } |
  { 'InviteFailError' : null } |
  { 'InviteCodeError' : null } |
  { 'PostCommentNotFound' : null } |
  { 'PostAlreadyCompleted' : null } |
  { 'PostNotFound' : null } |
  { 'PostUnAuthorizedOperation' : null } |
  { 'UserNotFound' : null };
export interface PostPage {
  'page_size' : bigint,
  'data' : Array<Post>,
  'page_num' : bigint,
  'total_count' : bigint,
}
export interface PostPageQuery {
  'page_size' : bigint,
  'text' : string,
  'page_num' : bigint,
  'user_id' : string,
}
export type PostPageResult = { 'Ok' : PostPage } |
  { 'Err' : PostError };
export interface _SERVICE {
  'create_post' : (arg_0: PostCreateCommand) => Promise<CreatePostResult>,
  'getInvitationCode' : (arg_0: PostCreateCommand) => Promise<
      GetInvitationCodeResult
    >,
  'greet' : (arg_0: string) => Promise<string>,
  'linkByInvitationCode' : (arg_0: string) => Promise<LinkInvitationResult>,
  'query_posts' : (arg_0: PostPageQuery) => Promise<PostPageResult>,
}
