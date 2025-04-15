import { useAuth } from "@/features/auth";
import { EmailVerificationNotice } from "@/features/auth/components/EmailVerificationNotice";

const EmailVerificationNoticePage = () => {
  const { user } = useAuth();
  return <EmailVerificationNotice email={user?.email ? user.email : ""} />;
};

export default EmailVerificationNoticePage;
