

export default function emptyrecords(message:string, iconNotif: string, pending?: boolean, css?: string): any {
  return (
    <div className="no-data flex flex-col gap-5 justify-start items-center m-auto">
      {pending ? (
        <>
          <span className="mt-2 -mb-3 text-sm">Chargement ... </span>
          <span className="icon search spin4icon- text-2xl"></span>
        </>
      ) : (
        <>
          <p className="text-center -mb-3 text-lg text-gray-500">
            <img src={iconNotif} className={`${css} mx-auto`} alt={""} />
          </p>
          <span className="mt-2 text-sm text-gray-500">{message}</span>
        </>
      )}
    </div>
  );
}
