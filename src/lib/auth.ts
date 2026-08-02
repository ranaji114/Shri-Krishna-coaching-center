// Security & Authentication Helper for Admin Portal

const DEFAULT_USERNAME_HASH = "22e272713b7a981af539349b9fc26286b07dae6ea9cbc2469dfa47afab434781"; // "krishna_admin"
const DEFAULT_PASSWORD_HASH = "54ed4c63561c60233519dab681dece9af1331b240741533887d743ec85936557"; // "Krishna@Admin2026!"

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 3 * 60 * 1000; // 3 minutes

export async function hashText(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function checkLockoutStatus(): { isLocked: boolean; remainingSec: number } {
  if (typeof window === "undefined") return { isLocked: false, remainingSec: 0 };

  const attemptsData = localStorage.getItem("skcc_admin_attempts");
  if (!attemptsData) return { isLocked: false, remainingSec: 0 };

  try {
    const { count, lastFailed } = JSON.parse(attemptsData);
    if (count >= MAX_FAILED_ATTEMPTS) {
      const elapsed = Date.now() - lastFailed;
      if (elapsed < LOCKOUT_DURATION_MS) {
        const remainingSec = Math.ceil((LOCKOUT_DURATION_MS - elapsed) / 1000);
        return { isLocked: true, remainingSec };
      } else {
        // Reset after lockout period expires
        localStorage.removeItem("skcc_admin_attempts");
      }
    }
  } catch (e) {
    localStorage.removeItem("skcc_admin_attempts");
  }

  return { isLocked: false, remainingSec: 0 };
}

export function recordFailedAttempt() {
  if (typeof window === "undefined") return;
  const attemptsData = localStorage.getItem("skcc_admin_attempts");
  let count = 1;
  if (attemptsData) {
    try {
      const parsed = JSON.parse(attemptsData);
      count = (parsed.count || 0) + 1;
    } catch (e) {
      count = 1;
    }
  }
  localStorage.setItem("skcc_admin_attempts", JSON.stringify({ count, lastFailed: Date.now() }));
}

export function clearFailedAttempts() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("skcc_admin_attempts");
}

export async function verifyAdminCredentials(
  userIdInput: string,
  passwordInput: string
): Promise<{ success: boolean; message: string }> {
  // Check lockout
  const { isLocked, remainingSec } = checkLockoutStatus();
  if (isLocked) {
    return {
      success: false,
      message: `Security Lockout Active: Too many failed login attempts. Please try again in ${remainingSec} seconds.`,
    };
  }

  const envUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const envPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  let isValid = false;

  if (envUser && envPass) {
    // If env vars are provided
    isValid = userIdInput.trim() === envUser.trim() && passwordInput === envPass;
  } else {
    // Compare via SHA-256 hashes
    const userHash = await hashText(userIdInput);
    const passHash = await hashText(passwordInput);

    isValid = userHash === DEFAULT_USERNAME_HASH && passHash === DEFAULT_PASSWORD_HASH;
  }

  if (isValid) {
    clearFailedAttempts();
    return { success: true, message: "Authentication successful" };
  } else {
    recordFailedAttempt();
    return {
      success: false,
      message: "Invalid Administrative User ID or Password. Access Denied.",
    };
  }
}
