"use client";

import { useEffect, useState } from "react";
import { Input, Modal } from "antd";
import { Typography, Button } from "@/components";
import {
  IoSearchOutline,
  IoChevronForwardOutline,
  IoCloseOutline,
  IoCloseCircleOutline,
  IoClose,
} from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  getSearchModal: boolean;
  setSearchModal: (_e: boolean) => void;
  searchText: string;
};

const dataRecommended = [""];

export function HeaderTopSearchModal(props: Props) {
  const { getSearchModal, setSearchModal, searchText } = props;
  const [text, setText] = useState(searchText);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (getSearchModal) {
      onInit();
    }
  }, [getSearchModal]);

  const onInit = async () => {
    const data = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    setHistory(data);
  };

  return (
    <Modal
      open={getSearchModal}
      footer={false}
      onCancel={() => setSearchModal(false)}
      className=" w-[680px] [&>.ant-modal-content]:px-xxl [&>.ant-modal-content]:py-xl"
    >
      <div className="flex flex-col gap-lg">
        <Input
          className="flex text-subtitle2 items-center text-secondary bg-surface-secondary border-none [&>input]:bg-surface-secondary rounded-md"
          placeholder="Search..."
          prefix={<IoSearchOutline className="flex text-h5 text-brand" />}
          value={text}
          allowClear={{
            clearIcon: (
              <IoClose className="w-[18px] h-[18px] text-neutral-500" />
            ),
          }}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (text === "") {
                setSearchModal(false);
                return;
              }
              router.push(`/search/${text}`);
              setSearchModal(false);
              const searchHistories = [text, ...history];
              localStorage.setItem(
                "searchHistory",
                JSON.stringify(searchHistories.slice(0, 5))
              );
            }
          }}
        />
        <div className="flex flex-col gap-md">
          <Typography
            weight="bold"
            base="Subtitle"
            className="flex justify-between items-center mb-xs2 border-b-2 border-brand"
          ></Typography>

          {dataRecommended.map((e) => (
            <Link
              key={e}
              href={`/search/${e}`}
              onClick={() => setSearchModal(false)}
              className="border-b-[1px] pb-md border-secondary"
            >
              <Typography base="Subtitle2" className="flex justify-between">
                {e}
                <IoChevronForwardOutline className="ml-sm" />
              </Typography>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-md">
          <Typography
            weight="bold"
            base="Subtitle"
            className="flex justify-between items-center mb-xs2 border-b-2 border-brand"
          >
            History
            <Button
              size="small"
              type="text"
              leftIcon={<IoCloseCircleOutline />}
              onClick={() => {
                setHistory([]);
                localStorage.setItem("searchHistory", JSON.stringify([]));
              }}
            >
              Clear
            </Button>
          </Typography>

          {history.map((e, index) => (
            <Link
              key={e + index}
              href={`/search/${e}`}
              onClick={() => setSearchModal(false)}
              className="border-b-[1px] pb-md border-secondary"
            >
              <Typography base="Subtitle2" className="flex justify-between">
                {e}
                <Button
                  type="text"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const filteredHistory = history.filter(
                      (x, y) => index !== y
                    );
                    setHistory(filteredHistory);
                    localStorage.setItem(
                      "searchHistory",
                      JSON.stringify(filteredHistory)
                    );
                  }}
                >
                  <IoCloseOutline className="ml-sm" />
                </Button>
              </Typography>
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  );
}
