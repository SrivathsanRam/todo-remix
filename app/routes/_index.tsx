import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Reviews from "~/components/Review";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { useOptionalUser } from "~/utils";

import default_image from "../images/default_image.jpg";
import image1 from "../images/page1.jpg";
import image2 from "../images/page2.jpg";
import image3 from "../images/page3.jpg";

export const meta: MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const showcaseImages = [image1, image2, image3];

  const user = useOptionalUser();
  return (
    <main className="">
      <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          Todo: Be in Charge
        </h1>
          <div className="">
            {user ? (
              <Link
                to="/todos"
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
              >
                View Todo List for {user.email}
              </Link>
            ) : (
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  to="/join"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-md bg-blue-500 px-4 py-3 font-medium text-white hover:bg-blue-600"
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </header>

        {/* App Description */}
        <section className="mb-10 text-center">
          <p className="text-lg leading-relaxed">
            Specifications:
          </p>
          <div className="">
          <ul className="list-disc list-inside text-gray-700 dark:text-black">
            <li>Stack: Remix, Tailwind, Prisma ORM, Supabase</li>
            <li>Used shadcn/ui components to create calendar</li>
            <li>Learnt and used route actions and loaders to read and write data</li>
            <li>3 column layout for optimised user experience</li>
          </ul>
          </div>
        </section>

        {/* Showcase Library */}
        <section className="mb-10">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Showcase Library
          </h2>
          <div className="flex justify-center">
          <Carousel className="w-full max-w-screen-md outline justify-center">
            <CarouselContent className="items-center">
            {showcaseImages.map((path, index) => (
              <CarouselItem
                key={index}
                className="mx-auto flex items-center justify-center h-80"
              >
                <img
                  src={path}
                  alt={`Showcase ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover shadow-md"
                />
              </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold">
            User Reviews
          </h2>
          <div className="max-w-screen-sm mx-auto">
          <Reviews
            reviews={[
              {
                stars: 5,
                profileImage: default_image,
                title: "Amazing App!",
                review: "This app is fantastic. Highly recommend!",
              },
              {
                stars: 4,
                profileImage: default_image,
                title: "Very Good",
                review: "Great features, but room for improvement.",
              },
            ]}
          />
          </div>
        </section>
      </div>
    </main>
  );
}
