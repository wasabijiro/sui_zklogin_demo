"use client"

// import { useLottie } from "../helpers/useLottie";
import { useNonce } from "../scripts/useNonce";
// import loginAnimationData from "../components/interface/animations/login.json";
// import googleAnimationData from "../components/interface/animations/google.json";


// ユーザーはあなたのアプリケーションにアクセスし、「Googleでログイン」ボタンをクリックします。
// ユーザーはhttps://accounts.google.com/o/oauth2/v2/auth?${params} にリダイレクトされ、
// Googleアカウントでログインし、アプリケーションへのアクセスを許可します。
// ユーザーはhttps://zklogin-dev-redirect.vercel.app/api/auth にリダイレクトされ、
// このエンドポイントは認証コードまたはトークンを受け取り、それを使用してアクセストークンを取得します。
// アクセストークンを取得した後、アプリケーションはユーザーをhttp://localhost:4000/dashboard にリダイレクトし、
// ユーザーはアプリケーションのダッシュボードにアクセスできます。
export default function Home() {
  // const { container } = useLottie(loginAnimationData, true);
  // const { container: googleAnimationContainer } = useLottie(
  //   googleAnimationData,
  //   true
  // );
  const { nonce } = useNonce();

  // ユーザーがログインした後にアプリケーションがユーザーをリダイレクトする目的地
  const REDIRECT_URI = "http://localhost:4000/login";

  const paramsObject: Record<string, string> = {
    state: new URLSearchParams({
      redirect_uri: REDIRECT_URI,
    }).toString(),
    client_id:
      "25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com",
    redirect_uri: "https://zklogin-dev-redirect.vercel.app/api/auth",
    response_type: "id_token",
    scope: "openid",
  };

  if (nonce !== null && nonce !== undefined) {
    paramsObject.nonce = nonce;
  }

  const params = new URLSearchParams(paramsObject);

  // const params = new URLSearchParams({
  //   state: new URLSearchParams({
  //     redirect_uri: REDIRECT_URI,
  //   }).toString(),
  //   client_id:
  //     "25769832374-famecqrhe2gkebt5fvqms2263046lj96.apps.googleusercontent.com",
  //   redirect_uri: "https://zklogin-dev-redirect.vercel.app/api/auth",
  //   response_type: "id_token",
  //   scope: "openid",
  //   nonce: nonce !== null ? nonce : undefined,
  // });

  // GoogleのOAuth 2.0認証エンドポイント
  // このURLにリダイレクトすることで、ユーザーはGoogleアカウントでログインし、アプリケーションへのアクセスを許可することができる
  const loginURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl text-gray-600 font-bold">ZKLogin Demo</h1>
      {/* <div ref={container}></div> */}
      <a
        className="flex text-lg items-center justify-center border-solid border-[2px] border-gray-200 w-full gap-2 pr-4 rounded-md text-gray-700 hover:bg-gray-200 max-w-[20em] font-bold"
        href={loginURL}
      >
        {/* <div className="max-w-[50px]" ref={googleAnimationContainer}></div> */}
        Login with Google
      </a>
    </div>
  );
}
