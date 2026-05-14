import mock from "@/mocks/users.json";

export function getCurrentUser() {
  return mock.users[0];
}
