type StoredUser = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
};

const STORAGE_KEY = "ictGirlsUsers";

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const loadUsers = (): StoredUser[] => {
  if (typeof localStorage === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse stored users", error);
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export async function registerUser(name: string, email: string, password: string) {
  const users = loadUsers();
  const normalizedEmail = normalizeEmail(email);
  const exists = users.some((u) => u.email === normalizedEmail);
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: StoredUser = {
    name: name.trim(),
    email: normalizedEmail,
    password,
  };

  users.push(newUser);
  saveUsers(users);

  return { name: newUser.name, email: newUser.email, avatar: newUser.avatar };
}

export async function loginUser(email: string, password: string) {
  const users = loadUsers();
  const normalizedEmail = normalizeEmail(email);
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user) {
    throw new Error("No account found for this email.");
  }
  if (user.password !== password) {
    throw new Error("Incorrect password.");
  }
  return { name: user.name, email: user.email, avatar: user.avatar };
}
