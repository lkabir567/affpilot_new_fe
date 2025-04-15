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
