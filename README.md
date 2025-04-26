# easy-nav-progress

> A simple top navigation transition progress bar.

> Based on react

> Note: Do not use button clicks to trigger transition effects too frequently, as this may result in unexpected and undesirable effects.

![demo.png](demo.png)

how to use
```javascript
// step 1
<ProgressBarProvider>
   <App />
</ProgressBarProvider>

// step 2
useEffect(() => {
  const f = async () => {
    start();

    /**
     * Simulation:
     * when the target page has important data that needs to be loaded in advance,
     * you can jump after the data is loaded, and the transition effect during the waiting period.
     */
    await new Promise((resolve) => setTimeout(resolve, 2_000));

    done();

    navigate("/x");
  }
  f()
}, [])


```


