import React from "react";
import Title from "../ui/Title";
import "../../styles/Category.css";

import moghavemat from "../../assets/images/moghavemat.png";

export default function Category() {
  return (
    <section className="category-container mt-[15rem] flex flex-col items-center gap-[50px]">
      <Title headline={"دسته بندی جامع شهدا"} underHeadline={"تمامی اطلاعات، تصاویر، وصایا و خاطرات شهدا در یک مکان متمرکز و منظم"}/>
      <div className="category-box-wrapper p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 overflow-hidden justify-items-center gap-[35px] w-max h-max">

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

        <div
          className="category-box-item overflow-hidden xl:w-[413px] xl:h-[391px] rounded-[30px] p-[50px]
                bg-gradient-to-br from-[#e0d8cc] to-[#aa895f]
                border-[5px] border-white
                shadow-[0px_4px_12px_0px_#00000033]
                flex flex-col items-center justify-center gap-[30px]"
        >
          <div
            className="category-logo w-[103px] h-[95px] rounded-[20px] p-[10px] 
                bg-[#e6ccb2] flex items-center justify-center"
          >
            <img
              src={moghavemat}
              alt="category-logo-img object-cover"
              className="category-logo-img"
            />
          </div>
          <div className="category-text text-center">
            <h3 className="category-title font-bold text-[32px] text-[#b71c1c] leading-[176%]">
              {" "}
              شهدای مدافع حرم{" "}
            </h3>
            <p className="category-description font-bold text-[18px] text-white mb-[10px]">
              {" "}
              زندگینامه و تصاویر شهدای مدافع حرم{" "}
            </p>
          </div>
          <a
            href="#"
            className="more-btn rounded-[10px] px-[30px] py-[10px]
                   bg-gradient-to-l from-[#ffd700] to-[#ffa500]
                   border-[2px] border-[#ffd700]
                   font-semibold text-[12px] text-[#1a1a2e] hover:shadow-[0px_4px_14px_0px_#ffd7004d]"
          >
            {" "}
            مشاهده بیشتر{" "}
          </a>
        </div>

      </div>
    </section>
  );
}
