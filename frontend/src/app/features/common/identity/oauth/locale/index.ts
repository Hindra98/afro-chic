export interface AuthenticationViewModel {
  subscriptionKey: string;
  userName: string;
  password: string;
}

export interface Props {
  initialSubscriptionKey?: string;
  initialUserName?: string;
}
