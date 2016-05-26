/************************************************************************
* @brief Hilbert's space filling curve for three dimentional arrays
* @input iteration defines a 3D cube with a number of points on one
*        side N equal to (1 << iteration). The total number of points
*        in the cube is N*N*N. Each point is defined by 3 floats.
* @return A one dimentional Float32Array holding an unwrapped 3D cube.
*         Number of elements in the array is 3*N*N*N.
* @note Indicies in the array are normalized to a unity cube (min: 0,0,0; max: 1,1,1) 
* @author flux242@gmail.com
************************************************************************/
function createSFCArray(iteration) 
{
  if (iteration<=0)
    return 0;

  var N = 1 << iteration;
  var N3 = N*N*N;
  var buffer = new Float32Array(3*N3);

  var state = {
    vert : 0, 
    X    : 0,
    Y    : 0,
    Z    : 0,
  };
  zpk(state, buffer, N, 1, 1,1,1);

  for (var i=0;i<3*N3;++i)
    buffer[i]/=(N-1);

  return buffer;
}


function zpk(st, arr, n, block, xsign, ysign, zsign)
{
  switch(block)
  {
   case 1:
    if (n>2) zpk(st, arr, n/2,6, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,3, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,3, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,5, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,5, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,3, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,3, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,6, -xsign, ysign, -zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   case 2:
    if (n>2) zpk(st, arr, n/2,5, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,4, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,4, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,6, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,6, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,4, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,4, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,5, xsign, -ysign, -zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   case 3:
    if (n>2) zpk(st, arr, n/2,1, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,6, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,6, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,4, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,4, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,6, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,6, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, -ysign, zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   case 4:
    if (n>2) zpk(st, arr, n/2,2, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,5, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,5, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,3, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,3, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,5, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,5, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, -ysign, -zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   case 5:
    if (n>2) zpk(st, arr, n/2,4, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z-=zsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, -ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,4, xsign, ysign, zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   case 6:
    if (n>2) zpk(st, arr, n/2,3, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y-=ysign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, -ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Z+=zsign;
    if (n>2) zpk(st, arr, n/2,2, xsign, ysign, zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X-=xsign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.Y+=ysign;
    if (n>2) zpk(st, arr, n/2,1, -xsign, ysign, -zsign);
    arr[st.vert++] = st.X; arr[st.vert++] = st.Y; arr[st.vert++] = st.Z;
    st.X+=xsign;
    if (n>2) zpk(st, arr, n/2,3, xsign, -ysign, -zsign);
    arr[st.vert] = st.X; arr[st.vert+1] = st.Y; arr[st.vert+2] = st.Z;
    break;

   default: break;
  } 
}
