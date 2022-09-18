export const idlFactory = ({ IDL }) => {
  const PostCreateCommand = IDL.Record({
    'text' : IDL.Text,
    'user_other_id' : IDL.Text,
  });
  const PostError = IDL.Variant({
    'PostAlreadyExists' : IDL.Null,
    'InviteFailError' : IDL.Null,
    'InviteCodeError' : IDL.Null,
    'PostCommentNotFound' : IDL.Null,
    'PostAlreadyCompleted' : IDL.Null,
    'PostNotFound' : IDL.Null,
    'PostUnAuthorizedOperation' : IDL.Null,
    'UserNotFound' : IDL.Null,
  });
  const CreatePostResult = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : PostError });
  const GetInvitationCodeResult = IDL.Variant({
    'Ok' : IDL.Text,
    'Err' : PostError,
  });
  const Post = IDL.Record({
    'id' : IDL.Nat64,
    'is_invited' : IDL.Bool,
    'text' : IDL.Text,
    'user_self_id' : IDL.Text,
    'timestamp' : IDL.Nat64,
    'user_other_id' : IDL.Text,
  });
  const LinkInvitationResult = IDL.Variant({ 'Ok' : Post, 'Err' : PostError });
  const PostPageQuery = IDL.Record({
    'page_size' : IDL.Nat64,
    'text' : IDL.Text,
    'page_num' : IDL.Nat64,
    'user_id' : IDL.Text,
  });
  const PostPage = IDL.Record({
    'page_size' : IDL.Nat64,
    'data' : IDL.Vec(Post),
    'page_num' : IDL.Nat64,
    'total_count' : IDL.Nat64,
  });
  const PostPageResult = IDL.Variant({ 'Ok' : PostPage, 'Err' : PostError });
  return IDL.Service({
    'create_post' : IDL.Func([PostCreateCommand], [CreatePostResult], []),
    'getInvitationCode' : IDL.Func(
        [PostCreateCommand],
        [GetInvitationCodeResult],
        [],
      ),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'linkByInvitationCode' : IDL.Func([IDL.Text], [LinkInvitationResult], []),
    'query_posts' : IDL.Func([PostPageQuery], [PostPageResult], []),
  });
};
export const init = ({ IDL }) => { return []; };
