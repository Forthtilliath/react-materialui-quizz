import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Result from "./pages/Result/Result";
import Quiz from "./pages/Quiz/Quiz";
import { Layout } from "./components/Layout/Layout";
import {
  categories,
  Category,
  difficulties,
  Difficulty,
  Question,
} from "./stores/gameStore";
import ky from "ky";
import { generateURL } from "./helpers/location";
import { redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
        loader: ({ request }): Promise<Question[]> | Response => {
          const params = new URL(request.url).searchParams;
          const category = params.get("category");
          const difficulty = params.get("difficulty");
          try {
            assertsIsCategory(category);
            assertsIsDifficulty(difficulty);
            return fetchQuestions(category, difficulty);
          } catch {
            return redirect("/");
          }
        },
      },
      {
        path: "*",
        element: <Navigate to="" />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

async function fetchQuestions(category: Category, difficulty: Difficulty) {
  const res = await ky
    .get(
      generateURL("https://opentdb.com/api.php", {
        amount: 10,
        type: "multiple",
        category,
        difficulty,
      })
    )
    .json<{
      response_code: number;
      results: [
        {
          category: `Entertainment: ${string}`;
          type: "multiple";
          difficulty: Difficulty;
          question: string;
          correct_answer: string;
          incorrect_answers: [string, string, string];
        }
      ];
    }>();
  return res.results;
}

function assertsIsCategory(
  category: Nullish<string>
): asserts category is Category {
  categories.parse(category);
}

function assertsIsDifficulty(
  difficulty: Nullish<string>
): asserts difficulty is Difficulty {
  difficulties.parse(difficulty);
}