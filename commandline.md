###dfx canister call api methods
dfx canister call post_service getInvitationCode "(record {user_other_id=\"testuser\"; text=\"gogogo\" })"    
dfx canister call post_service linkByInvitationCode "kkpVv3kc"
####查询页码数量减一
 dfx canister call post_service query_posts "(record {page_num=0;page_size=10;user_id=\"\";text=\"\" })"
