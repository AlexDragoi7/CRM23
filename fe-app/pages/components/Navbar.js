import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      localStorage.clear();
    }
    router.push("/");
  };
  return (
    <Stack pl="24" pr="24" pb="18" pt="18" backgroundColor="white">
      <Button
        display="flex"
        alignSelf="end"
        variant="outline"
        colorScheme="blue"
        onClick={handleLogout}
      >
        {" "}
        Logout
      </Button>
    </Stack>
  );
};

export default Navbar;
