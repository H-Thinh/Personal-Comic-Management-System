import "./Rate.css";

import TableRate from "./TableRate";
import { useEffect, useState } from "react";
import { getRates, UpdateStatusForRate } from "../../../api/rateApi";
import { Rates } from "./RateType";

function Rate() {
  const [dataRates, setDataRates] = useState<Rates[]>([]);

  useEffect(() => {
    const getRatesApi = async () => {
      try {
        const resRates = await getRates();
        setDataRates(resRates);
      } catch (error) {
        console.log(error);
      }
    };
    getRatesApi();
  }, []);

  const handleStatusRate = async (
    id: number,
    comicId: number,
    userId: number
  ) => {
    try {
      const resUpdatedStatus = await UpdateStatusForRate(id, {
        comicId,
        userId,
      });
      setDataRates((prev) => {
        return prev.map((p) =>
          p.id === id ? { ...p, status: resUpdatedStatus.status } : p
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="category-management">
        <h2 className="section-title">Quản lý đánh giá</h2>
        <TableRate dataRates={dataRates} handleStatusRate={handleStatusRate} />
      </section>
    </>
  );
}

export default Rate;
