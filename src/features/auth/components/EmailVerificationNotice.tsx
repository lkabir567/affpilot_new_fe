// // src/features/auth/components/EmailVerificationNotice.tsx
// import { Button } from "@/components/ui/button";
// // import { useResendVerificationEmailMutation } from "@/redux/api/auth.api";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export function EmailVerificationNotice({ email }: { email: string }) {
//   const [resendEmail, { isLoading, isSuccess }] = ();
//   const [countdown, setCountdown] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   useEffect(() => {
//     if (isSuccess) {
//       setCountdown(30);
//       setCanResend(false);
//       const timer = setInterval(() => {
//         setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [isSuccess]);

//   useEffect(() => {
//     if (countdown === 0) setCanResend(true);
//   }, [countdown]);

//   return (
//     <div className="max-w-md mx-auto space-y-4">
//       <div className="text-center space-y-2">
//         <h1 className="text-2xl font-bold">Verify Your Email</h1>
//         <p className="text-muted-foreground">
//           We've sent a verification link to <span className="font-semibold">{email}</span>
//         </p>
//       </div>

//       <div className="space-y-4">
//         <Button
//           onClick={() => resendEmail({ email })}
//           disabled={!canResend || isLoading}
//           className="w-full"
//           aria-label="Resend verification email"
//         >
//           {isLoading ? "Sending..." :
//            isSuccess ? "Sent! Check your inbox" :
//            `Resend Email ${!canResend ? `(${countdown}s)` : ''}`}
//         </Button>

//         {canResend && !isSuccess && (
//           <p className="text-sm text-muted-foreground text-center">
//             Didn't receive the email? Check spam folder or{" "}
//             <Button
//               variant="link"
//               onClick={() => resendEmail({ email })}
//               className="p-0 text-primary font-semibold"
//               aria-label="Try resending again"
//             >
//               try again
//             </Button>
//           </p>
//         )}

//         <div className="text-center text-sm">
//           <Link to="/login" className="text-primary hover:underline">
//             Return to login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import { FaEnvelopeOpenText } from "react-icons/fa";
import { Link } from "react-router-dom";
export function EmailVerificationNotice({ email }: { email: string }) {
  // Add your resend email logic here

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-background rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-blue-100/80 dark:bg-blue-900/20 p-4 rounded-full">
            <FaEnvelopeOpenText className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Confirm Your Email
            </h1>
            <p className="text-muted-foreground">
              We sent a verification link to
            </p>
            <p className="font-medium text-primary text-lg">
              {email || "your email"}
            </p>
          </div>

          <div className="w-full space-y-4">
            {/* <Button className="w-full gap-2" size="lg">
              <TbReload className="h-5 w-5" />
              Resend Verification Email
            </Button> */}

            <div className="text-center text-sm text-muted-foreground">
              <p className="mt-4">
                Didn't receive the email? Check your spam folder or{" "}
                <Link
                  to="/signup"
                  className="block text-primary font-medium hover:underline underline-offset-4"
                >
                  try another email address
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span className="mr-2">←</span>
                Return to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
