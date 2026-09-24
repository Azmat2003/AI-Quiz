import React from "react";

function FormSuccess({ success }) {

    return (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs">
                ✓
            </div>

            <p>{success}</p>
        </div>
    )
}

export default FormSuccess;