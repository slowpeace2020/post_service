
use candid::{CandidType, Deserialize, Principal};

use super::error::UserError;

pub type UserId = u64;
pub type Timestamp = u64;

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserProfile {
    pub id: UserId,
    pub owner: Principal,     // 用户 Principal
    pub name: String,
    pub avatar_id: u64,
    pub avatar_uri: String,
    pub status: UserStatus,
    pub created_at: Timestamp,
}

// impl Default for UserProfile {
//     fn default() -> Self {
//         Self {
//             owner: Principal::anonymous(),
//             ..Default::default()
//         }
//     }
// }
impl UserProfile {
    pub fn new(id: UserId, owner: Principal, name: String,
            avatar_id: u64, avatar_uri: String,status: UserStatus, created_at: u64) -> Self {
        Self {
            id,
            owner,
            name,
            avatar_id,
            avatar_uri,
            status,
            created_at,
        }
    }

    pub fn valid_name(name: &str) -> bool {
        name.chars().count() <= 20
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub enum UserStatus {
    Enable,
    Disable,
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserRegisterCommand {
    pub name: String,
}

impl UserRegisterCommand {
    pub fn build_profile(self, id: UserId, owner: Principal, status: UserStatus, created_at: u64) -> UserProfile {
        UserProfile::new(id, owner,self.name, 0, "".to_string(), status, created_at)
    }
}

#[derive(Debug, Clone, CandidType, Deserialize)]
pub struct UserEditCommand {
    pub name: String,
    pub avatar_id: u64,
    pub avatar_uri: String,
    pub status: UserStatus,
}

impl UserEditCommand {
    pub fn build_profile(self, profile: &mut UserProfile) -> Result<bool, UserError> {
        if !UserProfile::valid_name(&self.name) {
            return Err(UserError::UserNameTooLong);
        }

        profile.name = self.name;
        profile.avatar_id = self.avatar_id;
        profile.avatar_uri = self.avatar_uri;
        profile.status = self.status;

        Ok(true)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_name_should_work() {
        let cmd = UserRegisterCommand {
            name: "".to_string(),
        };
        let id = 10001;
        let owner = Principal::anonymous();
        let status = UserStatus::Enable;
        let created_at = 100000000000000;
        let user = cmd.build_profile(id, owner, status, created_at);
        assert!(UserProfile::valid_name(&user.name));
    }
}