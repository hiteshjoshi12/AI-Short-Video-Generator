"use client";
import { db } from "@/configs/db";
import { Users } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

const Provider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      isNewUser();
    }
  }, [user]);

  const isNewUser = async () => {
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.email, user?.primaryEmailAddress?.emailAddress));

      if (!result[0]) {
        await db.insert(Users).values({
          name: user?.fullName || "Anonymous",
          email: user?.primaryEmailAddress?.emailAddress || "",
          imageUrl: user?.imageUrl || "",
        });
      }
    } catch (error) {
      console.error("Error checking or creating user:", error);
    }
  };

  return <div>{children}</div>;
};

export default Provider;
