import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuote } from "../hooks/useQuotes";
import { CourierCard } from "./courierCard";
import type { Courier } from "../types";

const schema = z.object({
  originCountry: z.string().min(1, "Origin country is required"),
  originCity: z.string().min(1, "Origin city is required"),
  destinationCountry: z.string().min(1, "Destination country is required"),
  destinationCity: z.string().min(1, "Destination city is required"),
  weight: z.coerce.number().min(1, "Weight must be greater than 0"),
});

type FormValues = z.infer<typeof schema>;

export const QuickQuoteForm = () => {
  const { setDestination, setWeight } = useQuote();
  const [activeStep, setActiveStep] = useState(0);
  const [quotes, setQuotes] = useState<Courier[]>([]);
  const [loading, setLoading] = useState(false);

  const steps = ["Origin", "Destination", "Weight"];

  const { control, handleSubmit, trigger } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    mode: "onChange",
    defaultValues: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
      weight: 0,
    },
  });

  const handleNext = async () => {
    let fields: (keyof FormValues)[] = [];
    if (activeStep === 0) fields = ["originCountry", "originCity"];
    if (activeStep === 1) fields = ["destinationCountry", "destinationCity"];
    if (activeStep === 2) fields = ["weight"];
    const valid = await trigger(fields);
    if (valid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const fetchQuotes = async () => {
    setLoading(true);
    setQuotes([]);
    await new Promise((r) => setTimeout(r, 1000));
    setQuotes([
      { name: "DHL", price: 23, estimatedDays: 2 },
      { name: "FedEx", price: 25, estimatedDays: 1 },
      { name: "Aramex", price: 20, estimatedDays: 3 },
    ]);
    setLoading(false);
  };

  const onSubmit = (data: FormValues) => {
    setWeight(data.weight);
    setDestination({
      country: data.destinationCountry,
      city: data.destinationCity,
    });
    fetchQuotes();
    setActiveStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-3xl shadow-xl border border-gray-200">
      {/* Stepper */}
      <div className="flex justify-between mb-10">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative transition-all duration-500"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold transform transition-all duration-500 ${
                activeStep >= index
                  ? "bg-indigo-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </div>
            <p
              className={`mt-2 text-sm font-semibold transition-colors duration-500 ${
                activeStep >= index ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              {step}
            </p>
            {index < steps.length - 1 && (
              <div className="absolute top-5 right-0 w-full h-1 bg-gray-300 -z-10" />
            )}
          </div>
        ))}
      </div>

      <div className="transition-all duration-500">
        {activeStep < 3 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {activeStep === 0 && (
              <div className="flex flex-col md:flex-row gap-6">
                <Controller
                  name="originCountry"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1 flex flex-col">
                      <input
                        {...field}
                        placeholder="Origin Country"
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm transition transform hover:scale-[1.02]"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="originCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1 flex flex-col">
                      <input
                        {...field}
                        placeholder="Origin City"
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm transition transform hover:scale-[1.02]"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            )}

            {activeStep === 1 && (
              <div className="flex flex-col md:flex-row gap-6">
                <Controller
                  name="destinationCountry"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1 flex flex-col">
                      <input
                        {...field}
                        placeholder="Destination Country"
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm transition transform hover:scale-[1.02]"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="destinationCity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div className="flex-1 flex flex-col">
                      <input
                        {...field}
                        placeholder="Destination City"
                        className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm transition transform hover:scale-[1.02]"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-sm mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            )}

            {activeStep === 2 && (
              <Controller
                name="weight"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <input
                      {...field}
                      type="number"
                      placeholder="Weight (kg)"
                      className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white shadow-sm transition transform hover:scale-[1.02]"
                    />
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            )}

            <div className="flex justify-between mt-6">
              {activeStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition transform hover:scale-105 font-medium"
                >
                  Back
                </button>
              )}
              <button
                type={activeStep === 2 ? "submit" : "button"}
                onClick={activeStep !== 2 ? handleNext : undefined}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition transform hover:scale-105 font-medium"
              >
                {activeStep === 2 ? "Get Quotes" : "Next"}
              </button>
            </div>
          </form>
        )}

        {/* Results */}
        {activeStep === 3 && (
          <div className="mt-10 flex flex-col gap-6 transition-opacity duration-500 ease-in-out">
            <h2 className="text-3xl font-bold text-indigo-700">
              Courier Quotes
            </h2>

            {loading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-28 bg-gray-200 rounded-2xl animate-pulse shadow-inner"
                  />
                ))}
              </div>
            ) : quotes.length === 0 ? (
              <p className="text-gray-500 text-lg">
                No couriers available for this route.
              </p>
            ) : (
              <div className="flex flex-col md:flex-row md:flex-wrap gap-6">
                {quotes.map((c) => (
                  <CourierCard
                    key={c.name}
                    courier={c}
                    cheapest={
                      c.price === Math.min(...quotes.map((x) => x.price))
                    }
                    fastest={
                      c.estimatedDays ===
                      Math.min(...quotes.map((x) => x.estimatedDays))
                    }
                  />
                ))}
              </div>
            )}

            <button
              className="mt-4 px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition transform hover:scale-105 font-medium self-start"
              onClick={() => setActiveStep(0)}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
