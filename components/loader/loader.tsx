interface CircularLoaderProps {
  children: any;

}

export const PageLoader = ({children}: CircularLoaderProps) => {
  return (
    <>
      
    </>
  )
}

export const CircularLoader = ({}) => {
  return (
    <div className="flex w-full mt-20 justify-center align-center">
      <div className="circular-loader"></div>
    </div>

  );
};

