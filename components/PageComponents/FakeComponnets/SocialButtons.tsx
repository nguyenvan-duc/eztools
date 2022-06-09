/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable @next/next/no-img-element */
export const SocialButtons = () => {
  return (
    <div className="flex pr-6 pl-6 bg-gray-200 justify-between items-center">
      <div className="h-12 text-center text-lg w-full flex justify-center items-center">
        <h1 className="mr-4">Author: <a className="underline" href="https://github.com/SirwanAfifi">Sirwan Afifi</a></h1>
       |
        <h1 className="ml-4">Source code: <a
          className="inline-block h-4"
          href="https://github.com/SirwanAfifi/ts-faker"
        >
          <img
            src="https://img.shields.io/github/stars/SirwanAfifi/ts-faker?style=social"
            alt=""
          />
        </a>
        </h1>
      </div>
    </div>
  );
};
