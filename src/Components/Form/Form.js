import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { Button, Input } from "@mui/material";

import "./Form.css";

const CenteredForm = () => {
  const [crypto, setCrypto] = useState([]);
  const [currency, setCurrency] = useState([]);
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        await fetch("http://localhost:3001/latestcoins").then(
          async (response) => {
            if (response.ok) {
              const coins = await response.json();
              setCrypto(coins.data);
              return;
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    };
    const fetchCurrency = async () => {
      try {
        await fetch("http://localhost:3001/currencies").then(
          async (response) => {
            if (response.ok) {
              const currencies = await response.json();
              setCurrency(currencies.data);
              return;
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    };
    fetchCoins();
    fetchCurrency();
  }, []);

  const formSubmit = async (eve) => {
    console.log(eve);
    try {
      await fetch("http://localhost:3001/finalamount", {
        method: "POST",
        body: JSON.stringify(eve),
      }).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleError = (errors) => {};
  const submitValidation = {
    cryptocurrency: { required: "cryptocurrency is required" },
    amount: { required: "amount is required" },
    currency: { required: "currency is required" },
  };
  return (
    <form onSubmit={handleSubmit(formSubmit, handleError)}>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: "5vh",
          width: "30vw",
          height: "70vh",
          borderRadius: "5px",
        }}
      >
        <h3>Crytpo Exchange</h3>

        <FormControl>
          <InputLabel id="cryptocurrency" required>
            Crypto Currency
          </InputLabel>
          <Select
            labelId="crypto"
            id="cryptocurrency"
            label="Crypto Currency "
            {...register("cryptocurrency", submitValidation.cryptocurrency)}
            defaultValue={""}
          >
            {crypto.length !== 0 &&
              crypto.map((coin) => {
                return (
                  <MenuItem key={coin.id} value={coin.id}>
                    {coin.name}
                  </MenuItem>
                );
              })}
          </Select>
          <small style={{ color: "red" }}>
            {" "}
            {errors?.cryptocurrency && errors.cryptocurrency.message}
          </small>
        </FormControl>
        <FormControl>
          <Input
            style={{ textAlign: "center" }}
            type="Number"
            id="amount"
            placeholder="Enter the Amount"
            {...register("amount", submitValidation.amount)}
          />
          <small style={{ color: "red" }}>
            {" "}
            {errors?.amount && errors.amount.message}
          </small>
        </FormControl>
        <FormControl>
          <InputLabel id="currency" required>
            Target Currency
          </InputLabel>
          <Select
            labelId="currency"
            id="currency"
            label="Target Currency "
            {...register("currency", submitValidation.currency)}
            defaultValue={""}
          >
            {currency.length !== 0 &&
              currency.map((curr) => {
                return (
                  <MenuItem key={curr.id} value={curr.id}>
                    {curr.name}
                  </MenuItem>
                );
              })}
          </Select>
          <small style={{ color: "red" }}>
            {" "}
            {errors?.currency && errors.currency.message}
          </small>
        </FormControl>
        <Button type="submit" variant="contained">
          Sumbit
        </Button>
      </div>
    </form>
  );
};

export default CenteredForm;
