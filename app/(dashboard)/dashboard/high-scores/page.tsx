
import { UserClient } from "@/components/tables/user-tables/client";
import { highScores } from "@/constants/data";

export default function page() {
  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <UserClient data={highScores} />
      </div>
    </>
  );
}