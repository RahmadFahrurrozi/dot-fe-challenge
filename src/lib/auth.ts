export type LoginUser = {
  userName: string;
  password: string;
  loggedAt?: string;
};

const LS_KEY = "quiz-user";

export const HARDCODED_USER = {
  userName: "teacher",
  password: "teacher123",
};

export function login(user: LoginUser) {
  if (
    user.userName === HARDCODED_USER.userName &&
    user.password === HARDCODED_USER.password
  ) {
    const loggedUser = {
      userName: user.userName,
      loggedAt: new Date().toISOString(),
    };

    localStorage.setItem(LS_KEY, JSON.stringify(loggedUser));

    return { ok: true, user: loggedUser };
  }

  return { ok: false, message: "Username or password is incorrect" };
}

export function getUser() {
  const user = localStorage.getItem(LS_KEY);
  return user ? JSON.parse(user) : undefined;
}
