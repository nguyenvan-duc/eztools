import React, { useEffect, useState } from "react";
import Moment from 'react-moment';
import Layout from "../components/Layout";
import HeadSeo from "../components/HeadSeo";
import NavbarLink from "../components/DataComponents/Navbar.json";
import Link from "next/link";
export default function Home() {
  const [search, setSearch] = useState("");
  const handleSearch = (value) => {
    setSearch(value);
  };
  return (
    <>
      <HeadSeo title={"Công cụ 🛠👀"} img="https://uploads-ssl.webflow.com/612a3d9cd9c35344a2460d68/62a0bb3771d3d1a603f0a147_2.png" />
      <Layout>
        <div className=" max-w-6xl m-auto">
          <div className="flex justify-center mt-20 lg:pt-6">
     
            <input
              onChange={(value) => handleSearch(value.target.value)}
              className="border textMono border-black w-full py-5 text-3xl px-6 max-w-4xl m-auto outline-none rounded-full shadow-blog-l"
              placeholder="Nhập từ khóa để tìm kiếm công cụ..."
            />
          </div>
          <div className="mt-16 ld:mt-20">
            {NavbarLink?.map((item, index) => {
              const filterItems = item.items.filter((item) =>
                item.name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              );

              return (
                <>
                  {filterItems.length > 0 && (
                    <>
                      <h1 className="px-3 mt-10 border-l-4 border-black text-3xl textMono font-bold">
                        {item.title}
                      </h1>
                      <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-8">
                        {filterItems.map((itemInItem, index) => (
                          <Link href={itemInItem.href} key={index}>
                            <a className="w-full textMono p-4 h-44 border border-black bg-white hover:shadow-blog-l hover:translate-y-blog-4m hover:translate-x-blog-4p  ease-in duration-200">
                              <span className="text-lg bg-black text-white ">
                                {itemInItem.name}
                              </span>
                              <p className="mt-2">{itemInItem.desc}</p>
                            </a>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
