import User from "../models/User";

export const isMutualFollow = async (userA, userB) => {

  const [u1, u2] = await Promise.all([
    User.findById(userA).select("following"),
    User.findById(userB).select("following"),
  ]);

  if (!u1 || !u2) return false;

  const aFollowsB = u1.following.some(
    (id) => id.toString() === userB.toString()
  );

  const bFollowsA = u2.following.some(
    (id) => id.toString() === userA.toString()
  );

  return aFollowsB && bFollowsA;
};
