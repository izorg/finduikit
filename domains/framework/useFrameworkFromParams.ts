import { useParams } from "next/navigation";

import { getFrameworkFromParams } from "./getFrameworkFromParams";

export const useFrameworkFromParams = () => getFrameworkFromParams(useParams());
