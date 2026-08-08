import {useRouter} from "next/router";
import Products from "./products";

export default function Home() {
  const router = useRouter();
  return (
   <>
    <div>
      <Products></Products>
    </div>
   </>
  );
}
