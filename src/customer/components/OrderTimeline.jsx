import React from "react";

const steps = [
  { key: "PLACED", label: "Order Placed", icon: "📦" },
  { key: "CONFIRMED", label: "Confirmed", icon: "✔" },
  { key: "SHIPPED", label: "Shipped", icon: "🚚" },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: "📍" },
  { key: "DELIVERED", label: "Delivered", icon: "🏠" },
];

const OrderTimeline = ({ order }) => {
  const currentIndex = steps.findIndex(
    (step) => step.key === order.orderStatus
  );

  // ❌ If cancelled → show different UI
  if (order.orderStatus === "CANCELED") {
    return (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
        <p className="text-red-600 font-semibold text-sm">
          ❌ Order Cancelled
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">

      {/* TOP TEXT (Amazon style) */}
      {order.deliveryDate && (
        <p className="text-green-600 font-semibold text-sm mb-4 text-center">
          Arriving by{" "}
          {new Date(order.deliveryDate).toLocaleDateString()}
        </p>
      )}

      {/* TIMELINE */}
      <div className="flex items-center justify-between relative">

        {/* PROGRESS LINE BACKGROUND */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0"></div>

        {/* PROGRESS LINE ACTIVE */}
        <div
          className="absolute top-5 left-0 h-1 bg-green-500 z-0 transition-all duration-500"
          style={{
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center flex-1 z-10"
            >
              {/* ICON */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-lg transition-all duration-300
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }
                  ${isCurrent ? "scale-110 shadow-md" : ""}
                `}
              >
                {step.icon}
              </div>

              {/* LABEL */}
              <p
                className={`text-xs mt-2 text-center ${
                  isCompleted
                    ? "text-green-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;