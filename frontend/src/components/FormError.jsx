import React from "react";

function FormError({error}) {

    return(
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300 animate-pulse">
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs">
            !
        </div>

        <p>{error}</p>
    </div>
    )
}

export default FormError;
